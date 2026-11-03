# Prueba de Concepto: Nginx

Este proyecto simple configura un entorno de desarrollo con **Nginx** como servidor proxy inverso que maneja sencillos microservicios basados en **Node.js**. Cada servicio es desplegado utilizando Docker, y Nginx dirige el tráfico a los servicios correspondientes.

## Arquitectura

```mermaid
flowchart LR
    C([Navegador]) -->|"HTTP :3000"| R["Nginx :80<br/>301 → HTTPS"]
    R -.-> N
    C -->|"HTTPS :443"| N["Nginx :443<br/>filtro de user-agent<br/>límite de peticiones"]

    N -->|"/"| H["Sitio estático<br/>/usr/share/nginx/html"]
    N -->|"/api/auth<br/>round robin"| A1["auth_api1 :5001"] & A2["auth_api2 :5002"]
    N -->|"/api/users<br/>ip_hash"| U1["user_api1 :3001"] & U2["user_api2 :3002"]
    N -->|"/api/products<br/>least_conn"| P1["product_api1 :4001"] & P2["product_api2 :4002"]
```

Todos los contenedores comparten la red `api_network` de Docker Compose. Cada API tiene dos instancias, y cada `upstream` usa una estrategia de balanceo distinta:

| Ruta | Upstream | Estrategia | Comportamiento |
|---|---|---|---|
| `/api/auth` | `auth_api` | Round robin (por defecto) | Alterna entre instancias en cada petición. |
| `/api/users` | `user_api` | `ip_hash` | La misma IP siempre llega a la misma instancia. |
| `/api/products` | `product_api` | `least_conn` | Envía a la instancia con menos conexiones activas. |

Además, Nginx:
- Redirige todo el tráfico HTTP a HTTPS.
- Rechaza con 403 los user-agents de bots, `curl` y `wget`.
- Limita a 5 peticiones por segundo por IP (con ráfagas de hasta 10) y a 1 conexión simultánea.

## Requisitos

- Docker
- Docker Compose
- [mkcert](https://github.com/FiloSottile/mkcert), para generar el certificado HTTPS local

## Instrucciones de Uso

1. Clona este repositorio:
```bash
git clone https://github.com/FelipeUH/PoC-Nginx.git
cd PoC-Nginx
```

2. Genera el certificado HTTPS para `localhost`. Los archivos `.pem` no están en el repositorio (`.gitignore`), y la imagen de Nginx los necesita para construirse:
```bash
mkcert -install
mkcert -key-file nginx/localhost-key.pem -cert-file nginx/localhost.pem localhost
```

3. Construye las imágenes y ejecuta los contenedores utilizando Docker Compose:
```bash
docker-compose up --build
```

4. Accede a la aplicación en tu navegador:
* https://localhost: Nginx sirve una página con botones que llaman a los tres endpoints. Aquí Nginx actúa como servidor web. Si entras por http://localhost:3000, Nginx te redirige a HTTPS.
* https://localhost/api/users: Nginx redirige la petición GET al microservicio de usuarios y devuelve la respuesta.
* https://localhost/api/products: Nginx redirige la petición GET al microservicio de productos y devuelve la respuesta.
* `/api/auth` solo acepta **POST**, así que se prueba con el botón de la página y no abriéndolo en la barra de direcciones.

Cada respuesta indica qué instancia la atendió. En `/api/products` y `/api/auth` las peticiones se reparten entre las dos instancias. En `/api/users`, en cambio, siempre responde la misma, porque `ip_hash` asigna cada IP a una instancia fija (ver [Arquitectura](#arquitectura)).

> Nginx rechaza con 403 las peticiones de `curl` y `wget`. Para probar desde la terminal, envía otro user-agent: `curl -k -A "Mozilla/5.0" https://localhost/api/users`.

5. Para detener los contenedores:
```bash
docker-compose down
```

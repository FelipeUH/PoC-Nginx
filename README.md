# Prueba de Concepto: Nginx

Este proyecto simple configura un entorno de desarrollo con **Nginx** como servidor proxy inverso que maneja sencillos microservicios basados en **Node.js**. Cada servicio es desplegado utilizando Docker, y Nginx dirige el tráfico a los servicios correspondientes.

## Requisitos

- Docker
- Docker Compose

## Instrucciones de Uso

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/mi-proyecto.git
cd mi-proyecto
```

2. Construye y ejecuta los contenedores utilizando Docker Compose
```bash
docker-compose up --build
```

3. Accede a la aplicación en tu navegador:
*  https://localhost: Nginx servirá una página con botones que redirigen a los dos endpoints. Aquí Nginx actúa de servidor web.
* http://localhost/api/users: Nginx redirige la petición al microservicio de usuarios y devuelve la respuesta.
* http://localhost/api/products: Nginx redirige la petición al microservicio de productos y devuelve la respuesta.

Al realizar diferentes peticiones a un mismo endpoint podemos ver que cada vez nos da respuesta una instacia diferente, debido a que Nginx está balanceando las cargas.

4. Para detener los contenedores:
```bash
docker-compose down
```
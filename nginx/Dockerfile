FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./html /usr/share/nginx/html/

COPY ./localhost.pem /etc/nginx/ssl/localhost.pem
COPY ./localhost-key.pem /etc/nginx/ssl/localhost-key.pem

EXPOSE 80 443
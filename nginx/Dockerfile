FROM nginx:latest

WORKDIR /app
COPY html /usr/share/nginx/html/

RUN apt-get update && \
    apt-get install vim -y

EXPOSE 80

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
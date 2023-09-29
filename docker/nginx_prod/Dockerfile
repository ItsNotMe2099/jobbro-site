ARG APP_IMAGE
FROM ${APP_IMAGE} as app

FROM nginx:stable-alpine

RUN apk add --update --no-cache \
    bash\
    curl

COPY  docker/nginx_prod/nginx.conf /etc/nginx/nginx.conf
COPY  docker/nginx_prod/server.conf /etc/nginx/conf.d/default.conf.template
COPY --from=app /usr/src/app/.next/static /var/www/public/_next/static
COPY --from=app /usr/src/app/public /var/www/public
COPY  docker/nginx_prod/certs/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY  docker/nginx_prod/certs/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key
COPY  docker/nginx_prod/certs/dhparam.pem /etc/ssl/certs/dhparam.pem
EXPOSE 80 443
CMD ["sh", "-c", " envsubst '$$API_HOST $ADMIN_HOST $$ALLOW_NET $SSL'  < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

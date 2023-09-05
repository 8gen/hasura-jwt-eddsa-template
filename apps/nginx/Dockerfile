FROM nginx:1.21.6
RUN apt install gettext-base -yy
RUN rm /etc/nginx/conf.d/default.conf

COPY ./apps/nginx/nginx.conf.template /etc/nginx/
COPY ./apps/nginx/nginx.entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN echo "<h1>PoWix dev server</h1>" > /usr/share/nginx/html/index.html
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

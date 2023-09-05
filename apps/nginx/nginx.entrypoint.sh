#!/bin/sh

export HOST

envsubst '${HOST}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"

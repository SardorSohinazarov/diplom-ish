# diplom.qales.uz — static site served by Caddy. Build context: repository root.
# The site itself is generated beforehand: cd diplom/generator && node site.mjs  →  diplom/sayt/
FROM caddy:2-alpine

COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY diplom/sayt /srv

EXPOSE 80

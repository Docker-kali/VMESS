const ASSET_URL = 'https://github.com/v2fly/v2ray-core/releases/download/v4.32.1/v2ray-linux-64.zip';
const CONFIG = {
    "log": {
        "access": "",
        "error": "",
        "loglevel": "warning"
    },
    "inbounds": [{
        "port": 8080,
        "protocol": "vmess",
        "settings": {
            "clients": [{
                "id": "2db6afd0-7001-4e98-ac61-28015a8e6776", // Ganti dengan UUID Anda
                "alterId": 0
            }]
        },
        "streamSettings": {
            "network": "ws",
            "wsSettings": {
                "path": "/" // Ganti sesuai keinginan
            }
        }
    }],
    "outbounds": [{
        "protocol": "freedom",
        "settings": {}
    }]
};

addEventListener(
    "fetch", event => {
        let url = new URL(event.request.url);
        if (url.pathname.startsWith('/yourpath')) {
            event.respondWith(handleRequest(event.request));
        } else {
            event.respondWith(fetch(ASSET_URL));
        }
    }
);

async function handleRequest(request) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/yourpath')) {
        return new Response(JSON.stringify(CONFIG), {
            headers: { "content-type": "application/json" }
        });
    }
    return fetch(ASSET_URL);
}

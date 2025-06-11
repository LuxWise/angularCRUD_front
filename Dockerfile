FROM node:24-alpine3.22

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli@15

# Copia el resto de los archivos
COPY . .

# Expone el puerto 4200
EXPOSE 4200

# Comando de inicio (sin espacios dentro de los parámetros)
CMD ["ng", "serve", "--proxy-config=proxy.conf.json", "--host=0.0.0.0", "--disable-host-check"]

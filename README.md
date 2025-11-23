# Despliegue de SonarQube y Trivy en VM Azure

**Danna Valentina López Muñoz - A00395625**

Este documento describe el proceso de despliegue de SonarQube y Trivy en una máquina virtual de Azure usando Docker.

##  Resumen del Proceso

### 1. Ejecución de Sonar y Trivy en local

Lo primero que se hizo fue probar que Sonar y Trivy funcionaran de manera local para el proyecto, primero se configuro SonarQube, agregando los archivos ´docker-compose.yml´ y ´sonar-project.properties´

![Ejecucción de SonarQube](imagenes/dockerfile.png)

![Ejecucción de SonarQube](imagenes/sonar.png)

 y se ejecuto el contenedor

![Ejecucción del Contenedor](imagenes/ejecucion-contenedor.png)

Posteriormente ejecutamos los siguientes comandos para analizar el proyecto con SonarQube y detectar que vulnerabilidades pueden haber en el proyecto

```bash
npm test -- --coverage
```

Este comando generará el archivo coverage/lcov.info que SonarQube usará. Y por siguiente ejecutaremos:
```bash
docker run --rm \
  --network sonarqube_sonarnet \
  -e SONAR_HOST_URL="http://sonarqube:9000" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli
```

Por lo que cuando accedemos a la URL ´http://sonarqube:9000´ podemos ver que ya se carga el proyecto y podemos analizar la calidad del código y qué correciones se deben de realizar. Por ejemplo, en este caso se tiene un coverage del 82% y la condición para aprobar código es que fuera al menos del 80%. 
![Análisis del proyecto en SonarQube](imagenes/proyecto-sonar.png)

Ahora, para configurar Trivy lo que se hizo fue agregar el servicio al ´docker-compose.yml´ y ejecutar el siguiente comando

```bash
docker compose run --rm trivy fs --severity HIGH,CRITICAL /project
```
 
 Que genera el siguiente reporte

 [Reporte Trivy 1](imagenes/reporte-trivy1.png)
 [Reporte Trivy 2](imagenes/reporte-trivy2.png)

Ya con el funcionamiento de los servicios en local procedemos a desplegarlos en la máquina virtual de azure

### 2. Despliegue de la Máquina Virtual

Se utilizó el proyecto Terraform existente en `vm-deploy` para desplegar la infraestructura:

```bash
cd vm-deploy
scripts/deploy-dev.sh
```

Se utilizo el script en `vm-deplot/scripts` para despliegar automaticamente la VM pero también se puede hacer manualmente ejecutando los siguientes comandos:
```bash
cd terraform/environments/dev
terraform init
terraform plan -var="admin_password=AzureVM123!"
terraform apply -var="admin_password=AzureVM123!" -auto-approve
```  


**Recursos desplegados:**
- Resource Group: `rg-ingesoft-dev`
- Virtual Network: `vnet-ingesoft-dev`
- Subnet: `snet-ingesoft-dev`
- Network Security Group: `nsg-ingesoft-dev`
- Public IP: `pip-ingesoft-dev`
- Virtual Machine: `vm-ingesoft-dev`

### 2. Configuración de la VM

La VM se desplegó con las siguientes características:
- **OS:** Ubuntu 22.04 LTS
- **Tamaño:** Standard_B2s (1 vCPU, 4GB RAM)
- **IP Pública:** 172.172.44.22
- **Usuario:** azureuser
- **Contraseña:** TuContrasenaSegura123!

En cuanto a la configuración de la red, se agregó la regla para permitir el tráfico en el puerto 9000 como se puede ver en el archivo `terraform/environments/dev/terraform.tfvars`

```bash
{
  name                       = "allow-sonarqube"
  priority                   = 1002
  direction                  = "Inbound"
  access                     = "Allow"
  protocol                   = "Tcp"
  source_port_range          = "*"
  destination_port_range     = "9000"
  source_address_prefixes    = ["0.0.0.0/0"]
  destination_address_prefix = "*"
}
```


### 3. Instalación de Docker

Nos conectamos a la VM y se instaló Docker y Docker Compose en la VM usando el repositorio oficial de Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

![Instalación de Docker](imagenes/instalar-dockerVM.png)

### 4. Configuración del Proyecto

Se creó el directorio del proyecto trasfiriendo el proyecto de la máquina local a la VM usando el comando scp:

```bash
scp -r ./SonarQube azureuser@172.172.44.22:/home/azureuser/
```

![Clonación del proyecto](imagenes/clonar-proyecto.png)
![Verificación de existencia del proyecto en VM](imagenes/proyecto-en-VM.png)

Una vez que se hizo este paso, se cerro sesión y se volvió a conectar a la VM.

### 5. Despliegue de SonarQube

Se inició SonarQube usando Docker Compose:

```bash
cd Prometheus-Grafana/
sudo docker-compose up -d
```

Eliminamos la versión antigua de node (v12) y limpiamos cache de apt para evitar conflictos

```bash
sudo apt remove -y nodejs npm libnode-dev
sudo apt autoremove -y
sudo apt clean
sudo rm -rf /var/lib/apt/lists/*
sudo apt update
```

Y reinstalamos node a una versión más reciente (versión 20)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Ahora instalamos librerias del proyecto y ejecutamos el servicio como hicimos en local para que analice el proyecto (la carpeta de node_modules y coverage deben estar dentro del proyecto que se trasfirio a la VM, se recomienda enviar las carpeta comprimidas y descomprimirlas dentro del proyecto en la VM)

```bash
docker run --rm \
  --network sonarqube_sonarnet \
  -e SONAR_HOST_URL="http://sonarqube:9000" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli
```
Vemos que al ejecutar el comando nos sale un error relacionado al token de SonarQube, esto es debido a que se requiere autenticación
![Instalación en la VM](imagenes/despliegue-sonar.png)

Por lo tanto, accedemos a la máquina mediante su ip por el puerto 9000 que fue donde expusimos el servicio
```bash
172.172.44.22:9000
```

Nos muestra la siguiente pantalla donde nos loguearemos con las credenciales `admin` para ambos campos

![Cambio de credenciales para SonarQube](imagenes/login-sonar.png)

La siguiente pantalla nos pedirá colocar la contraseña anterior (`admin`) y digitar una nueva, después de hacer eso llegamos a la pantalla de inicio y vamos a crear un nuevo token para reemplazar el que se había creado en local, se da click sobre la foto de perfil, se selecciona "My Account" y en el aparte de "Security" se crea el token global (Lo mejor es tener este token como un secreto o en un .env pero por simplicidad se dejara en el sonar-project.properties y en los comandos)

![Generación de token](imagenes/security.png)

Una vez que se agrego el nuevo token, volvemos ejecutar el comando para analizar el proyecto con SonarQube

```bash
docker run --rm \
  --network sonarqube_sonarnet \
  -e SONAR_HOST_URL="http://sonarqube:9000" \
  -e SONAR_TOKEN="sqa_c2117a98d33c10db71be9ef64e4041b24e23e249" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli
```
Con esto ya habremos analizado el proyecto y podemos ver la calidad del mismo en la interfaz de SonarQube en el apartado de `Projects` 

![Comando para analizar proyecto (sonar-sacnner)](imagenes/proyecto-analizado.png)
![Detalles sobre la calidad del código y posibles vulnerabilidades](imagenes/resultado-analisis.png)


### 6. Despliegue de Trivy

Para el caso de Trivy, como ya se pudo apreciar en local, no tiene una interfaz gráfica, así que vamos a ejecutar el siguiente comando en la VM

```bash
docker compose run --rm trivy fs --severity HIGH,CRITICAL /project > trivy_report.txt
cat trivy_report.txt
```

![Generación de reporte con Trivy](imagenes/trivy-reporte.png)


### 7. Pipeline Automatizado de Despliegue

Se implementó un pipeline de GitHub Actions para automatizar el despliegue de SonarQube y de Trivy:

#### Configuración de Secrets

Primero, configurar los secrets necesarios en GitHub:

- `ADMIN_PASSWORD`: Contraseña del usuario administrador de la máquina virtual de Azure
- `AZURE_CREDENTIALS`: Credenciales JSON generadas desde Azure para permitir la autenticación automática con Terraform
- `SONAR_HOST_URL`: URL del servidor de SonarQube desplegado (ejemplo: http://<IP_VM>:9000)
- `SONAR_PROJECT_KEY`: Identificador único del proyecto dentro de SonarQube 
- `SONAR_TOKEN`: Token de autenticación del usuario administrador de SonarQube 


![Generación de Infraestructura](imagenes/pipeline-infra.png)
![Generación de Integración Continua](imagenes/pipeline-ci.png)


## 8. Integración de Prometheus y Grafana

Se ha integrado Prometheus y Grafana al proyecto para monitorear las métricas de la aplicación NestJS.

### Configuración

El proyecto incluye:
- **Prometheus**: Sistema de monitoreo y alertas
- **Grafana**: Plataforma de visualización de métricas
- **Módulo de Prometheus para NestJS**: Expone métricas automáticamente en el endpoint `/metrics`

### Cómo Probar Prometheus y Grafana

#### Paso 1: Iniciar la aplicación NestJS

Primero, asegúrate de que tu aplicación NestJS esté corriendo en el puerto 5000:

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:5000`

#### Paso 2: Verificar el endpoint de métricas

Verifica que el endpoint de métricas esté funcionando:

```bash
curl http://localhost:5000/metrics
```

Deberías ver métricas en formato Prometheus como:
```
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.123

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0.045
...
```

#### Paso 3: Iniciar Prometheus y Grafana con Docker Compose

Inicia los servicios de Prometheus y Grafana:

```bash
docker-compose up -d prometheus grafana
```

O si quieres iniciar todos los servicios (SonarQube, Trivy, Prometheus y Grafana):

```bash
docker-compose up -d
```

#### Paso 4: Verificar que Prometheus esté recolectando métricas

1. Accede a la interfaz de Prometheus en: `http://localhost:9090`
2. Ve a **Status > Targets** para verificar que el target `nestjs-app` esté en estado "UP"
3. Si el target está "DOWN", verifica:
   - Que la aplicación NestJS esté corriendo en el puerto 5000
   - En Linux, puede ser necesario actualizar `prometheus/prometheus.yml` para usar la IP del host en lugar de `host.docker.internal`

#### Paso 5: Consultar métricas en Prometheus

En la interfaz de Prometheus (`http://localhost:9090`):

1. Ve a la pestaña **Graph**
2. Prueba algunas consultas como:
   - `process_cpu_user_seconds_total` - Tiempo de CPU del proceso
   - `process_resident_memory_bytes` - Memoria residente
   - `nodejs_heap_size_total_bytes` - Tamaño total del heap de Node.js
   - `http_requests_total` - Total de peticiones HTTP (si está configurado)

#### Paso 6: Acceder a Grafana

1. Accede a Grafana en: `http://localhost:3000`
2. Inicia sesión con:
   - **Usuario**: `admin`
   - **Contraseña**: `admin`
3. Grafana te pedirá cambiar la contraseña (opcional, puedes hacer clic en "Skip")

#### Paso 7: Verificar el datasource de Prometheus

1. En Grafana, ve a **Configuration > Data Sources**
2. Deberías ver que **Prometheus** ya está configurado como datasource por defecto
3. Haz clic en **Prometheus** y luego en **Save & Test** para verificar la conexión
4. Deberías ver un mensaje verde: "Data source is working"

#### Paso 8: Crear un dashboard básico

1. Ve a **Dashboards > New Dashboard**
2. Haz clic en **Add visualization**
3. Selecciona el datasource **Prometheus**
4. En la consulta, prueba con:
   ```
   process_cpu_user_seconds_total
   ```
5. Haz clic en **Run query** para ver los datos
6. Guarda el dashboard

#### Paso 9: Generar tráfico para ver métricas

Para ver métricas más interesantes, genera tráfico en tu aplicación:

```bash
# Hacer varias peticiones al endpoint principal
for i in {1..10}; do curl http://localhost:5000; done

# O acceder a otros endpoints de tu API
curl http://localhost:5000/api
```

Luego verifica las métricas en Prometheus o Grafana.

### Solución de Problemas

#### Prometheus no puede conectarse a la aplicación

Si el target está "DOWN" en Prometheus:

1. **En Linux**: Actualiza `prometheus/prometheus.yml` y cambia `host.docker.internal` por la IP de tu host:
   ```yaml
   static_configs:
     - targets: ['192.168.1.100:5000']  # Reemplaza con tu IP
   ```

2. **Alternativa**: Usa `network_mode: host` en el servicio de Prometheus en `docker-compose.yml`:
   ```yaml
   prometheus:
     network_mode: host
     # ... resto de la configuración
   ```

#### Verificar que los contenedores estén corriendo

```bash
docker-compose ps
```

Deberías ver `prometheus` y `grafana` con estado "Up".

#### Ver logs de los servicios

```bash
docker-compose logs prometheus
docker-compose logs grafana
```

### Métricas Disponibles

El módulo de Prometheus expone automáticamente las siguientes métricas:

- **Métricas del proceso**: CPU, memoria, tiempo de ejecución
- **Métricas de Node.js**: Heap size, event loop lag, garbage collection
- **Métricas HTTP**: Total de peticiones, duración (si se configuran interceptores)

### Archivos de Configuración

- `prometheus/prometheus.yml`: Configuración de Prometheus
- `grafana/provisioning/datasources/datasource.yml`: Configuración automática del datasource de Prometheus en Grafana
- `src/prometheus/prometheus.module.ts`: Módulo de Prometheus para NestJS



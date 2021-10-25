# 233126-212995-176902
Obligatorio de Arquitectura de Software

# contendor de docker con mysql:
docker run -d --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:latest

# Obtener sensres por id:
http://localhost:3000/api/sensors/ESN

ejemplo: http://localhost:3000/api/sensors/1

# Obtener todos los sensores:
http://localhost:3000/api/sensors

ejemplo: http://localhost:3000/api/sensors
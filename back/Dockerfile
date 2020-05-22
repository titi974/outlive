# Derived from official mysql image (our base image)
FROM mysql:5.7

# Add a database
ENV MYSQL_DATABASE jeux

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

# docker run -d -p 3308:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=supersecret my-mysql

FROM tomcat:latest
MAINTAINER tomspter
WORKDIR /usr/local/tomcat/webapps/ROOT/
RUN rm -f
COPY ./dist/ ./
EXPOSE 8080

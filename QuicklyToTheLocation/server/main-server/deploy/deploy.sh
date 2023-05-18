#!/bin/bash 

: 'Example:
bash deploy/deploy.sh <<-_end_of_file_
address
user
_end_of_file_
'

##################################################################
read -p "Enter server address: " SERVER_ADDR
read -p "Enter user: " USER

# Constants
USE_PROJECT_MAVEN=true
APP_NAME="server"
DEPLOY_PATH="/home/$USER/pmu"
##################################################################

if [ "$0" != "deploy/deploy.sh" ]; then
  echo "Please run the script from project's root directory."
  exit 1
fi

if $USE_PROJECT_MAVEN ; then
  ./mvnw clean install
else
  # Install maven
  sudo apt update
  sudo apt install maven -y

  # In case there is a problem with JAVA_HOME
  # echo export JAVA_HOME=~/.jdks/temurin-17.0.5 >> ~/.bashrc

  # Create jar file
  mvn clean install
fi

# If the jar is created copy the file to the server
if [ $? -eq 0 ]; then
  scp ./target/"$APP_NAME"*.jar $USER@$SERVER_ADDR:"$DEPLOY_PATH"
else
  echo "An error occurred while creating a jar file."
fi

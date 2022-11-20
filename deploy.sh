#!/usr/bin/bash


machine=$1

if [ $machine == "test" ];
then
    sleep 20
    echo 'Run Curl testing...'
    if curl -I test 2>&1 | grep -w "200\|301" ; then
        echo 'The Test Was A Success'
    else
        echo 'The Test Failed Unfortunately'
    fi
    
    echo 'Test Docker Finished !' 

else
    jenkins_folder="/var/lib/jenkins/workspace/dev-Automation/docker-compose.yml"
    docker login
    cd /home/ec2-user/bynet
    docker-compose down
    docker-compose up
fi
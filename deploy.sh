#!/usr/bin/bash

# VARABLES #
machine=$1
jenkins_folder="/var/lib/jenkins/workspace/dev-Automation/docker-compose.yml"
echo "deploying to $machine"
echo "createing directory and copy"
scp -o StrictHostKeyChecking=no -r $jenkins_folder ec2-user@$machine:/home/ec2-user/bynet
scp -o StrictHostKeyChecking=no -r ~/.docker/config.json ec2-user@$machine:~/.docker/config.json
echo "COPIED to $machine"
ssh ec2-user@$machine "docker login"
ssh ec2-user@$machine "docker pull yonatanfurmandocker/bynets_server2:1.0"
ssh ec2-user@$machine "docker pull yonatanfurmandocker/bynets_app2:1.0"
ssh ec2-user@$machine "docker-compose -f /home/ec2-user/bynet/docker-compose.yaml up -d"
if [ $machine == "test" ];
then
    sleep 20
    echo 'Run Curl testing...'
    if curl -I test 2>&1 | grep -w "200\|301" ; then
        echo 'The Test Was A Success'
    else
        echo 'The Test Failed Unfortunately'
    fi
    
    ssh ec2-user@$machine "docker-compose -f /home/ec2-user/bynet/docker-compose.yaml down"
    echo 'Test Docker Finished !' 
fi
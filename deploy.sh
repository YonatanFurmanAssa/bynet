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
    jenkins_folder="/var/lib/jenkins/workspace/bynet/docker-compose.yaml"
    DOCKERHUB_CREDENTIALS_PSW=$2
    DOCKERHUB_CREDENTIALS_USR=$3
    echo "deploying to $machine"
    echo "createing directory and copy"
    ssh ec2-user@$machine "mkdir bynet"
    scp -o StrictHostKeyChecking=no -r $jenkins_folder ec2-user@$machine:/home/ec2-user/bynet/docker-compose.yaml
    ssh ec2-user@$machine "mkdir .docker"
    scp -o StrictHostKeyChecking=no -r ~/.docker/config.json ec2-user@$machine:~/.docker/config.json
    echo "COPIED to $machine"
    ssh ec2-user@$machine "echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
    ssh ec2-user@$machine "cd bynet"
    ssh ec2-user@$machine "sudo docker-compose -f bynet/docker-compose.yaml down"
    ssh ec2-user@$machine "sudo docker-compose -f bynet/docker-compose.yaml up -d"
fi
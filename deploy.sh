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
    jenkins_folder="/var/lib/jenkins/workspace/nova_bynet"
    DOCKERHUB_CREDENTIALS_PSW=$2
    DOCKERHUB_CREDENTIALS_USR=$3
    echo "deploying to $machine"
    echo "createing directory and copy"
    ssh ec2-user@$machine "rmdir bynet"
    ssh ec2-user@$machine "mkdir bynet"
    scp -o StrictHostKeyChecking=no -r $jenkins_folder/docker-compose.yaml ec2-user@$machine:/home/ec2-user/bynet
        ssh ec2-user@$machine "rmdir Database"
    ssh ec2-user@$machine "mkdir Database"
    scp -o StrictHostKeyChecking=no -r $jenkins_folder/Database/bynet.sql ec2-user@$machine:/home/ec2-user/bynet/Database
    ssh ec2-user@$machine "rmdir .docker"
    ssh ec2-user@$machine "mkdir .docker"
    ssh ec2-user@$machine "rm ~/.docker/config.json"
    scp -o StrictHostKeyChecking=no -r ~/.docker/config.json ec2-user@$machine:~/.docker/config.json
    echo "COPIED to $machine"
    ssh ec2-user@$machine "echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
    ssh ec2-user@$machine "cd bynet"
    ssh ec2-user@$machine "sudo docker-compose -f bynet/docker-compose.yaml down"
    ssh ec2-user@$machine "sudo docker-compose -f bynet/docker-compose.yaml pull"
    ssh ec2-user@$machine "sudo docker-compose -f bynet/docker-compose.yaml up -d"
fi
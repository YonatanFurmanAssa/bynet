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
    scp -o StrictHostKeyChecking=no -r $jenkins_folder ec2-user@$machine:/home/ec2-user/bynet
    echo "COPIED to $machine"
    ssh ec2-user@$machine "echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
    ssh ec2-user@$machine "ls"
    ssh ec2-user@$machine "cd bynet"
    ssh ec2-user@$machine "docker-compose down"
    ssh ec2-user@$machine "docker-compose up -d"
fi
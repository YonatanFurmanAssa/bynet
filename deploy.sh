#!/usr/bin/bash


machine=$1
jenkins_folder="/var/lib/jenkins/workspace/dev-Automation/docker-compose.yml"
echo "deploying to $machine"
echo "createing directory and copy"
scp -o StrictHostKeyChecking=no -r $jenkins_folder ec2-user@$machine:/home/ec2-user/bynet
scp -o StrictHostKeyChecking=no -r ~/.docker/config.json ec2-user@$machine:~/.docker/config.json
echo "COPIED to $machine"
ssh ec2-user@$machine "docker login"
ssh ec2-user@$machine "cd /home/ec2-user/bynet"
ssh ec2-user@$machine "docker-compose down"
ssh ec2-user@$machine "docker-compose up"
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
fi
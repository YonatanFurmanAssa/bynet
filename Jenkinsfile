pipeline {
    environment {
        DOCKERHUB_CREDENTIALS=credentials('docker-cred')
        dockerfileFront = "/var/lib/jenkins/workspace/nova_bynet/Frontend"
        dockerfileBack = "/var/lib/jenkins/workspace/nova_bynet/Backend"
    }
    agent any
    stages {
        stage('Building The Frontend And Backend Docker Images') {
            agent any
            steps {
                script {
                    sh 'docker system prune --all'
                    echo 'y'
                    sh 'docker build -f $dockerfileFront/Dockerfile $dockerfileFront -t yonatanfurmandocker/bynet_app2:latest'
                    sh 'docker build -f $dockerfileBack/Dockerfile $dockerfileBack -t yonatanfurmandocker/bynet_server2:latest'
                    echo 'Building The Images Was A Success'
                }
            }
        }
        stage('Login') {

            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('docker push to hub'){
            steps {
                sh 'docker push yonatanfurmandocker/bynet_app2:latest'
                sh 'docker push yonatanfurmandocker/bynet_server2:latest'
                echo 'images were pushed to dockerhub'
                echo 'docker image removed from local'
            }
        }
        stage('Production'){
            steps{
                sshagent(['ec2-user']) {
                    sh 'bash -x deploy.sh 3.80.133.59 $DOCKERHUB_CREDENTIALS_PSW $DOCKERHUB_CREDENTIALS_USR'
                }
            }
        }
        stage('Test'){
            steps{
                sshagent(['ec2-user']) {
                    sh 'bash -x deploy.sh test'
                }
            }
        }
         
    }
    
}
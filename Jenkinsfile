pipeline {
    environment {
        DOCKERHUB_CREDENTIALS=credentials('docker-cred')
        dockerfileFront = "./Frontend"
        dockerfileBack = "./Backend"
    }
    agent any
    stages {
        stage('Building The Frontend And Backend Docker Images') {
            agent any
            steps {
                script {
                    
                    sh 'docker build -f $dockerfileFront/Dockerfile $dockerfileFront'
                    sh 'docker build -f $dockerfileBack/Dockerfile $dockerfileBack'
                    sh 'docker tag  68a6abb31606 yonatanfurmandocker/bynet_server2:1.0'
                    sh 'docker tag  025761f84164 yonatanfurmandocker/bynet_app2:1.0'
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
                sh 'docker push yonatanfurmandocker/bynet_app2:1.0'
                sh 'docker push yonatanfurmandocker/bynet_server2:1.0'
                echo 'images were pushed to dockerhub'
                // sh 'docker system prune --all'
                // echo 'y'
                // echo 'docker image removed from local'
            }
        }
        stage('Test'){
            steps{
                sshagent(['ec2-user']) {
                    sh 'bash -x deploy.sh test'
                }
            }
        }
         stage('Prod'){
            steps{
                sshagent(['ec2-user']) {
                    sh 'bash -x deploy.sh prod'
                }
            }
        }
         
    }
    
}
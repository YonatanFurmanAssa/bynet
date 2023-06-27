pipeline {
  
    agent any
    stages {
        stage('Building Frontend Image') {
            agent any
            steps {
                sh 'pwd'
                script {
                    sh 'docker build -f $dockerfileFront/Dockerfile $dockerfileFront -t yonatanfurmandocker/bynet_app2:latest'
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
                sh 'docker system prune --all'
                echo 'y'
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
                    sh 'bash -x deploy.sh test 3.80.133.59'
                }
            }
        }
         
    }
    
}

pipeline {
    environment {
        dockerfileFront = "/Users/yonatanf/bynet/Frontend"
    }
    agent any
    stages {
        // stage('Building Frontend Image') {
        //     agent any
        //     steps {
        //         script {
        //             sh 'docker build -f $dockerfileFront/Dockerfile $dockerfileFront -t yonatanfurmandocker/bynet_app2:latest'
        //             echo 'Image Was Built'
        //         }
        //     }
        // }
        stage('install azure on jenkins') {

            steps {
                sh 'curl -sL https://aka.ms/InstallAzureCLIDeb | bash'
                sh 'az account set --subscription 16001c95-e532-4041-96eb-aa2287e91761'
                sh 'az aks get-credentials --resource-group yonis-group --name calico'
                sh 'kubectl get pods '
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

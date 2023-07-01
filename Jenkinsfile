pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = 'yonatanfurmandocker/bynet_app2'
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_ID} /Users/yonatanf/bynet/bynet/Frontend/Dockerfile"
                }
            }
        }

        stage('Deploy to Kubernetes Cluster and also register to artifactory') {
            steps {
                script {
                        sh "docker login -u ${DOCKER_HUB_CREDS_USR} -p ${DOCKER_HUB_CREDS_PSW}"
                        sh "docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                        sh "kubectl create deployment my-app --image=${DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                }

                        
                
            }
        }
    }
}

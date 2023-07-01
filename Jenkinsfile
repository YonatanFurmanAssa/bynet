pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml """
                apiVersion: v1
                kind: Pod
                metadata:
                  labels:
                    app: jenkins-agent
                spec:
                  containers:
                  - name: jnlp
                    image: jenkins/inbound-agent:3107.v665000b_51092-15
                    tty: true
                  - name: docker
                    image: docker:latest
                    command:
                      - cat
                    tty: true
            """
        }
    }

    environment {
        DOCKER_IMAGE_NAME = 'yonatanfurmandocker/bynet_app2'
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_ID  /Users/yonatanf/bynet/bynet/Frontend} ."
                }
            }
        }

        stage('Deploy to Kubernetes Cluster') {
            steps {
                container('docker') {
                  sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                  sh "docker push ${DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                    }
                }

                container('jnlp') {
                    sh "kubectl create deployment my-app --image=${DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                }
            }
        }
    }
}

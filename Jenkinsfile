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
                    image: jenkins/jnlp-agent:4.10-4
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
        DOCKER_HUB_CREDS_ID = credentials('docker-hub-credentials')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh "docker build -t ${DOCKER_IMAGE_NAME}:${env.BUILD_ID} ."
                }
            }
        }

        stage('Deploy to Kubernetes Cluster') {
            steps {
                container('docker') {
                    withCredentials([string(credentialsId: DOCKER_HUB_CREDS_ID, variable: 'DOCKER_HUB_CREDS')]) {
                        sh "docker login -u ${DOCKER_HUB_CREDS_USR} -p ${DOCKER_HUB_CREDS_PSW}"
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

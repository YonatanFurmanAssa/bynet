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
                    image: docker:stable-dind
                    securityContext:
                      privileged: true
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
                container(name: 'docker', shell: '/bin/sh') {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            docker.build("${env.DOCKER_IMAGE_NAME}:${env.BUILD_ID}", '/Users/yonatanf/bynet/bynet/Frontend/')
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes Cluster') {
            steps {
                container(name: 'docker', shell: '/bin/sh') {
                    withCredentials([string(credentialsId: env.DOCKER_HUB_CREDS_ID, variable: 'DOCKER_HUB_CREDS')]) {
                        sh "docker login -u ${env.DOCKER_HUB_CREDS_USR} -p ${env.DOCKER_HUB_CREDS_PSW}"
                        sh "docker push ${env.DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                    }
                }

                container(name: 'jnlp', shell: '/bin/sh') {
                    sh "docker run -d --name my-app-container ${env.DOCKER_IMAGE_NAME}:${env.BUILD_ID}"
                }
            }
        }
    }
}



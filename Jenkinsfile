pipeline {
    agent {
        kubernetes {
            label 'my-jenkins-agent'
            defaultContainer 'jnlp'
            yaml """
            apiVersion: v1
            kind: Pod
            metadata:
              labels:
                app: my-jenkins-agent
            spec:
              containers:
              - name: docker
                image: docker
                command:
                - cat
                tty: true
              - name: jnlp
                image: jenkins/inbound-agent:3107.v665000b_51092-15
                env:
                - name: DOCKER_HOST
                  value: tcp://docker:2376
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
              volumes:
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
            """
        }
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                container('docker') {
                    script {
                    git 'https://github.com/IsraeliWarrior/bynet.git'
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    script {
                       FrontendImage = docker.build("yonatanfurmandocker/bynet-frontend:${env.BUILD_ID}:latest", "./bynet/Frontend")
                    
                        // Optional: Push the image to a Docker registry
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            dockerImage.push()
                        }
                    }
                }
            }
        }
    }
}

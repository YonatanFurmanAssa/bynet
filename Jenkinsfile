pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml '''
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
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
              - name: jnlp
                image: jenkins/inbound-agent
                env:
                - name: DOCKER_HOST
                  value: tcp://docker:2376
              volumes:
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
            '''
        }
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    script {
                         
                        // Build Docker image from the Dockerfile in the cloned repository directory
                        def dockerImage = docker.build('yonatanfurmandocker/bynet-frontend:${env.BUILD_ID}:latest','./Frontend')
                        
                        // Push the image to DockerHub using global credentials
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            dockerImage.push()
                        }
                    }
                }
            }
        }
    }
}

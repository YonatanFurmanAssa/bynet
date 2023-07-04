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
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
              - name: jnlp
                image: jenkins/inbound-agent
                args: ['$(JENKINS_URL)', '$(AGENT_NAME)']
                env:
                - name: DOCKER_HOST
                  value: tcp://docker:2376
              volumes:
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
            """
        }
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    // Install Git in the container
                    sh 'apt-get update && apt-get install -y git'
                    
                    // Clone the repository
                    sh 'git clone https://github.com/IsraeliWarrior/bynet.git'
                    
                    // Move to the cloned repository directory
                    sh 'cd bynet/Frontend'
                    
                    // Build Docker image from the Dockerfile in the cloned repository directory
                    def dockerImage = docker.build('your-dockerhub-username/your-image-name:tag', '.')
                    
                    // Push the image to DockerHub using global credentials
                    docker.withRegistry('https://registry.hub.docker.com', 'your-dockerhub-credentials-id') {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}

        }
    }
}

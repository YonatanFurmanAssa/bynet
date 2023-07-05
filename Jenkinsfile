pipeline {
    agent any
    stages {
        stage("Build Docker Image") {
            steps {
                    script {
                        // Build Docker image from the Dockerfile in the cloned repository directory
                        sh "docker.build(yonatanfurmandocker/bynet-frontend:1.0, "./Frontend")"
                        // Push the image to DockerHub using global credentials
                        docker.withRegistry("https://registry.hub.docker.com", "docker-hub-credentials") {
                            frontDockerImage.push()
                        }
                    }
                }
            }
    }
}

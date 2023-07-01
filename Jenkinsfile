pipeline {
    agent any
    
    tools {
        dockerTool 'docker'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("yonatanfurmandocker/bynet_app2:latest", "./Frontend")
                }
            }
        
        // Other stages in the pipeline
    }
}
}

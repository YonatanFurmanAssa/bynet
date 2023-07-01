pipeline {
    agent any
    
    tools {
        dockerTool 'docker'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t yonatanfurmandocker/bynet_app2:latest ./Frontend'
            }
        }
        // Other stages in the pipeline
    }
}

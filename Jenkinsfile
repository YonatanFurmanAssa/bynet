pipeline {
    agent any
    
    tools {
        dockerTool 'docker'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t yonatanfurmandocker/bynet_app2:latest /Users/yonatanf/bynet/bynet/Frontend/Dockerfile'
            }
        }
    }
}

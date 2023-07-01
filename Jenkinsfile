pipeline {
    agent any
    
    tools {
        dockerTool 'docker'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t your-image-name .'
            }
        }
    }
}

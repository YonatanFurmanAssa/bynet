pipeline {
    agent any
    
    tools {
        dockerTool 'docker'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/IsraeliWarrior/bynet.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dir('/bynet/Frontend') {
                    sh 'docker build -t yonatanfurmandocker/bynet_app2:latest .'
                }
            }
        }
        
        // Other stages in the pipeline
    }
}


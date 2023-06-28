pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes' // Name of the Kubernetes cloud you configured
        }
    }
    stages {
        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh 'kubectl apply -f deployment.yaml' // Replace with your kubectl command
                }
            }
        }
    }
}

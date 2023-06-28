pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes' // Name of the Kubernetes cloud you configured
        }
    }
    stages {
        stage('Deploy') {
            steps {
                container('jnlp') {
                    sh 'kubectl apply -f deployment.yaml' // Replace withyour kubectl command
                }
            }
        }
    }
}

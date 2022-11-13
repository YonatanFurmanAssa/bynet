pipeline {
    agent any 
    triggers {
    githubPush()
    }
       environment {
        frontend = "bynet_app2"
        backend = "bynet_server2"
        dockerfileFront = "./Frontend"
        dockerfileBack = "./Backend"
        registryCredential = 'docker-cred'
    }
    
    stages {
          stage('Clone git') {
            steps {
                git url: 'https://github.com/israeliwarrior/Docker-Project.git', branch: 'main'
            }
        }

        
          stage('Building the front image') {
            steps{
                
                 script {
                    docker.withRegistry( '', registryCredential ){
                    frontImage = docker.build(frontend + ":latest",
                    "-f ${dockerfileFront}/Dockerfile  ${dockerfileFront}"
                    )
                }
            }
                 }
        }
        
         stage('Building the backend image') {
            steps{
             
                script {
                      docker.withRegistry( '', registryCredential ){ 
                         backImage = docker.build(backend + ":latest",
                         "-f ${dockerfileBack}/Dockerfile  ${dockerfileBack}")
                        }
                }
                    
            }
        }

        // // stage('cleaning docker volumes'){

        // // }

        // stage('docker compose up'){
        //     steps{
        //     sh 'docker compose up -d --no-color --wait '
        //     sh 'docker compose ps' }
        // }




               stage('Deploing Image to dockerhub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        frontImage.push();
                        backImage.push();
                    }
    }

}
               }
    }
}
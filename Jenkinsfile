pipeline {
    environment {
        dockerfileFront = "/Users/yonatanf/jen/Frontend"}
    agent any
    stages {
        stage ('Connecting To Aks Cluster') {
            steps {
               sh 'az account set --subscription 16001c95-e532-4041-96eb-aa2287e91761'
               sh 'az aks get-credentials --resource-group yonis-group --name calico'
            }
        }
        stage('Building The Frontend And Backend Docker Images') {
            agent any
            steps {
                script {
                    sh 'docker build -f $dockerfileFront/Dockerfile $dockerfileFront -t yonatanfurmandocker/bynet_app2:latest'
                    echo 'Building The Images Was A Success'
                }
            }
        }
       
        stage('Docker Push Image To Harbour Registry'){
            steps {
                sh 'docker push yonatanfurmandocker/bynet_app2:latest'
                echo 'Frontend Image was Pushed To Harbour'
            }
        }
        stage('Production'){
            steps{
               echo 'yeat'
            }
        }
        stage('Test'){
            steps{
                echo 'yeat'
            }
        }
         
    }
    
}
        }
         
    }
    
}

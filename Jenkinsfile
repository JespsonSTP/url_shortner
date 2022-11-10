#! /usr/bin/groovy
pipeline {
    agent any
    triggers {
        githubPush()
    }
    options {
        //so that each build can be completed before another one starts
        disableConcurrentBuilds()
    }

    environment {
        PYTHONPATH = "${WORKSPACE}/flask_app/"
    }
    
    stages {
        stage('Unit-testing'){
            steps{
                script {
                    buildapp()
                }
            }
        }
        stage('Build'){
            steps{
                sh"echo we are checkout"
            }
        }
        stage('Deploy to dev'){
            steps{
                sh"echo we are checkout"
            }
        }
    }
}

def commitID() {
   sh 'git rev-parse HEAD > .git/commitID'
   def commitID = readFile('.git/commitID').trim()
   sh 'rm .git/commitID'
   commitID
}


//this is a function to build the app
def buildapp(){
    dir("/app"){
        def appImage = docker.build("urlshortner")
    }
}
def pushtodockerhub(){
    dir("/app"){
        def appImage = docker.build("jespstpierre/recipeservice")
        docker.withRegistry(registry, 'registry') {
           docker.image(imageName).push(commitID())
        }
    }
}

//this is a function to decide where to deploy the app based on environment
def deploy(environment) {
    def containerName = ''
    def port = ''

    if("${environment}" == 'dev'){
        containerName = "app_dev"
        port = "8080"
    }
    else if ("${environment}" == 'stage') {
		containerName = "app_stage"
		port = "88"
	}
    else if ("${environment}" == 'prod') {
		pushtodockerhub()
	}
    else{
        println "Environemnt doesn't match"
        System.exit(0)
    }

    sh"docker ps -f name=${containerName} -q | xargs --no-run-if-empty docker stop"
    sh"docker ps -a -f name=${containerName} -q | xargs -r docker rm"
    sh"docker run -d -p ${port}:8000 --name ${containerName} jespstpierre/recipeservice:${BUILD_NUMBER}"
}
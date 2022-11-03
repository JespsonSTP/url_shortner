#! /usr/bin/groovy
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    environment {
        PYTHONPATH = "${WORKSPACE}/rng/"
    }
    
    stages {
        stage('Checkout'){
            steps{
                checkout scm
            }
        }
        stage("Build") {
            dockerbuild()
        }
        stage("Unit-test") {

        }
        stage("Deploy-dev") {

        }
        stage("Integration testing") {

        }
        stage("Deploy-staging") {

        }
    }
}



def dockerbuild(){
    def appImage = docker.build("jespstpierre/rng:${BUILD_NUMBER}")
}


def deploy(environment) {

	def containerName = ''
	def port = ''

	if ("${environment}" == 'dev') {
		containerName = "app_dev"
		port = "8888"
	} 
	else if ("${environment}" == 'stage') {
		containerName = "app_stage"
		port = "88"
	}
	else if ("${environment}" == 'live') {
		containerName = "app_live"
		port = "80"
	}
	else {
		println "Environment not valid"
		System.exit(0)
	}

	sh "docker ps -f name=${containerName} -q | xargs --no-run-if-empty docker stop"
	sh "docker ps -a -f name=${containerName} -q | xargs -r docker rm"
	sh "docker run -d -p ${port}:5000 --name ${containerName} hands-on-jenkins/myapp:${BUILD_NUMBER}"

}
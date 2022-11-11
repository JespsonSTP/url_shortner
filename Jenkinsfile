#! /usr/bin/groovy
pipeline {
    agent any
    stages {
        stage('Unit-testing'){
            steps{
                script {
                    app = docker.build("jespstpierre/urlshortner")
                    app.inside{
                        sh " py.test --verbose --junit-xml test-reports/pytest-results.xml test_app.py"
                    }
                }
            }
        }
        stage('Build Image'){
            steps{
                script {
                    app = docker.build("jespstpierre/urlshortner")
                }
            }
        }
        stage('Pushing to Dockerhub'){
            when {
                branch 'master'
            }
            steps{
                script {
                    docker.withRegistry('http://registry.hub.docker.com', 'docker_hub_login'){
                        app.push("${env.BUILD_NUMBER}")
                        app.push("Latest")
                    }
                }
            }
        }
    }
}

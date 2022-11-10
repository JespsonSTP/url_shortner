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
        stage('Pushing to Dockerhub'){
            steps{
                script {
                    app = docker.build("jespstpierre/urlshortner")
                    app.inside{
                        sh " py.test --verbose --junit-xml test-reports/pytest-results.xml test_app.py"
                    }
                }
            }
        }
    }
}

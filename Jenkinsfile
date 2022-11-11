#! /usr/bin/groovy
pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "jespstpierre/urlshortner"
    }
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
                    app = docker.build(DOCKER_IMAGE_NAME)
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
        stage('Deploy to Prod'){
            when {
                branch 'master'
            }
            environment {
                $CANARY_REPLICAS = 1
            }
            steps{
                dir('kubs'){
                    kubernetesDeploy{
                        kubeconfigId: 'kubeconfig',
                        configs: 'canary_urlshortner.yml',
                        enableConfigSubstitution: true
                    }
                }
            }
        }
        stage('Deploy to Prod'){
            when {
                branch 'master'
            }
            environment {
                $CANARY_REPLICAS = 1
            }
            steps{
                input 'Deploy to Prod?'
                milestone(1)
                dir('kubs'){
                    kubernetesDeploy{
                        kubeconfigId: 'kubeconfig',
                        configs: 'canary_urlshortner.yml',
                        enableConfigSubstitution: true
                    }
                    kubernetesDeploy{
                        kubeconfigId: 'kubeconfig',
                        configs: 'urlshort_deployment.yml',
                        enableConfigSubstitution: true
                    }
                }
            }
        }
    }
}

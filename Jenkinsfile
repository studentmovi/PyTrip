pipeline {
    agent any

    environment {
        NODE_ENV = "production"
        DISCORD_WEBHOOK = credentials('discord-webhook')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Clonage du repo PyTrip (Next.js)"
                git branch: 'main',
                    url: 'https://github.com/studentmovi/PyTrip.git'
            }
        }

        stage('Node version') {
            steps {
                sh '''
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                echo "📦 Installation des dépendances"
                sh '''
                    npm ci
                '''
            }
        }

        stage('Lint (optionnel)') {
            steps {
                echo "🧹 Lint"
                sh '''
                    if npm run | grep -q lint; then
                        npm run lint
                    else
                        echo "Pas de script lint"
                    fi
                '''
            }
        }

        stage('Build Next.js') {
            steps {
                echo "🏗️ Build du site Next.js"
                sh '''
                    npm run build
                '''
            }
        }
    }

    post {
        success {
            sh '''
            curl -H "Content-Type: application/json" \
            -d "{
              \\"username\\": \\"Jenkins\\",
              \\"embeds\\": [{
                \\"title\\": \\"✅ Build SUCCESS – PyTrip\\",
                \\"color\\": 3066993,
                \\"fields\\": [
                  { \\"name\\": \\"Repository\\", \\"value\\": \\"studentmovi/PyTrip\\", \\"inline\\": true },
                  { \\"name\\": \\"Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"Status\\", \\"value\\": \\"SUCCESS  🚀\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins CI\\" },
                \\"timestamp\\": \\"$(date -Iseconds)\\"
              }]
            }" "$DISCORD_WEBHOOK"
            '''
        }

        failure {
            sh '''
            curl -H "Content-Type: application/json" \
            -d "{
              \\"username\\": \\"Jenkins\\",
              \\"embeds\\": [{
                \\"title\\": \\"❌ Build FAILED – PyTrip\\",
                \\"color\\": 15158332,
                \\"fields\\": [
                  { \\"name\\": \\"Repository\\", \\"value\\": \\"studentmovi/PyTrip\\", \\"inline\\": true },
                  { \\"name\\": \\"Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"Status\\", \\"value\\": \\"FAILURE 🚨\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins CI\\" },
                \\"timestamp\\": \\"$(date -Iseconds)\\"
              }]
            }" "$DISCORD_WEBHOOK"
            '''
        }
    }
}

pipeline {
    agent any
    
    // 1. LIMIT HISTORY: Keeps only the last 5 build logs/metadata
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    environment {
        SSH_ID = 'vps-ssh-key' 
        VPS_IP = '76.13.56.82' [cite: 10]
        FRONTEND_DIR = '/home/realestate-frontend' [cite: 10]
        BACKEND_DIR = '/home/realestate-app' [cite: 10]
    }

    stages {
        stage('Deploy Frontend') {
            steps {
                sshagent([SSH_ID]) { [cite: 11]
                    sh """
                    ssh -o StrictHostKeyChecking=no root@${VPS_IP} << 'EOF'
                    # 1. Update the code [cite: 12]
                    cd ${FRONTEND_DIR} || exit [cite: 11]
                    git fetch origin [cite: 12]
                    git reset --hard origin/main [cite: 12]

                    # 2. Rebuild the frontend [cite: 12]
                    cd ${BACKEND_DIR} [cite: 12]
                    docker compose up -d --build frontend 
                    
                    # 3. Cleanup VPS Disk (Clears the 15.8GB Cache)
                    docker image prune -f 
                    docker builder prune -f
EOF
                    """
                }
            }
        }
    }

    // 2. WIPE WORKSPACE: Deletes node_modules/code from the Jenkins volume
    post {
        always {
            cleanWs()
            echo 'Cleanup: Jenkins workspace cleared.'
        }
    }
}

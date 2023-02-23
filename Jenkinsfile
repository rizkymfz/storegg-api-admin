pipeline{
  agent any
  environment{
    IP_ANDY = credentials("url_ip_server_andy")
    DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1078195302609203240/s7n60rcbTc5ySaRi5pHifd75fWK3JRbX1zGZDWwI6MGp9RGzdgMfluPP-ArCd4v6C4ee"
  }
  stages{
    stage("Connect To Server"){
      steps{
           discordSend description: "Jenkins Pipeline Started #${env.BUILD_NUMBER}", footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "$DISCORD_WEBHOOK"
           sshagent(credentials:['ssh_server_node']){
              sh "ssh  -o StrictHostKeyChecking=no  root@$IP_ANDY 'cd /home/storegg-api-admin && git pull' "
           }
      }
    }
  }
  post{
     success{
       discordSend description: "Jenkins Pipeline Success #${env.BUILD_NUMBER}", footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "$DISCORD_WEBHOOK"
     }

     failure{
       discordSend description: 'Jenkins Pipeline Failed  #${env.BUILD_NUMBER}', footer: "", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "$DISCORD_WEBHOOK"
     }
  }
}
const { createApp } = Vue
  
createApp({
  data() {
    return {
      info:{
        name:'张三',
        idType:'身份证',
        id:'111111199901011111',
        bloodType:'O',
        donateType:'全血',
        num:'200ml',
        donateId:'1111111234567',
        address:'北京血站',
        date:'2024-01-01',
        dus:'北京省血液中心',
        phone:'111111111'
      },
      input:true
    }
  },
  methods: {
    creatQR(){
        let info = this.info
        new QRCode(document.getElementById("qrcode"),
            {
                text:"https://blog.zhoujump.club/blood-card/index.html"
                +'?n='+info.name
                +'&i='+info.idType
                +'&d='+info.id
                +'&t='+info.bloodType
                +'&a='+info.donateType
                +'&m='+info.num
                +'&b='+info.donateId
                +'&r='+info.address
                +'&e='+info.date
                +'&u='+info.dus
                +'&p='+info.phone
                +'&l=1',
                correctLevel : QRCode.CorrectLevel.M
        }
        )
    },
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
  },
  mounted() {
    if(this.getUrlKey('l'))
        {
        this.info.name=this.getUrlKey('n')
        this.info.idType=this.getUrlKey('i')
        this.info.id=this.getUrlKey('d')
        this.info.bloodType=this.getUrlKey('t')
        this.info.donateType=this.getUrlKey('a')
        this.info.num=this.getUrlKey('m')
        this.info.donateId=this.getUrlKey('b')
        this.info.address=this.getUrlKey('r')
        this.info.date=this.getUrlKey('e')
        this.info.dus=this.getUrlKey('u')
        this.info.phone=this.getUrlKey('p')
        this.creatQR()
        }
    else
    {
        this.input=false
    }
  },
}).mount('#app')
class Custom_APIResponse {
  constructor(data=null, message=null) {
    this.data = data;
    this.message = message;
  }

  success(res) {
    res.status(200).json({
      success: true,
      data: this.data,
      message: this.message || "İşlem başarılı !!!",
    });
  }

  created(res) {
    res.status(201).json({
      success: true,
      data: this.data,
      message: this.message || "İşlem başarılı !!!",
    });
  }

  error400(res) {
    res.status(400).json({
      success: false,
      data: this.data,
      message: this.message || "İşlem başarısız !!!",
    });
  }

  error401(res) {
     res.status(401).json({
      success: false,
      data: this.data,
      message: this.message || "İşlem başarısız, lütfen giriş yapın !!!",
    });
  }

  error403(res) {
     res.status(403).json({
      success:false,
      data:this.data,
      message:this.message || "İşlem başarısız, yetkiniz yok !!!"
    })
  }

  error404(res){
     res.status(404).json({
      success:false,
      data:this.data,
      message:this.message || "İşlem başarısız, aradığınız sayfa bulunamadı !!!"
    })
  }

  error429(res){
    res.status(429).json({
      success:false,
      data:this.data,
      message:this.message || "İşlem başarısız, çok fazla istekte bulundunuz. Lütfen daha sonra tekrar deneyiniz !!!"
    })
  }

}


module.exports = Custom_APIResponse;
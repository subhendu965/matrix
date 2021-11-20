class Matrix{

    constructor(data=[]){
        /////////public data properties///////////////
        this.rows=0;
        this.cols=0;

        ////////public config properties/////////
        this.isEditable=false;
        this.isFixedLength=false;        

        ///////////others properties///////
        this.matId=Matrix.mat_id++;

        this.loadData(data);
        
        ////attach the stylesheet if not attached/////
        this.addStyleSheet();
    }

    //////////override methods/////
    valueOf(){
        return this.determinant();
        
    }

    toString(){
        let str="[";
            if(this.data.length>0){
                for(let i=0;i<this.data.length;i++){
                    let ss="[";
                    for(let j=0;j<this.data[i].length>0;j++){
                        ss+=this.data[i][j];
                        if(j!=this.data[i].length-1)
                            ss+=",";
                    }
                    ss+="]";
                    str+=ss;
                    if(i!=this.data.length-1)
                        str+=",";
                }
            }
           
        str+="]";

        return str;
    }

    ///////////basic methods//////////////
    clean(){
        this.clearWithValue(0);
    }

    truncate(){
        this.data=[];
        this.rows=0;
        this.cols=0;
    }

    clearWithValue(value=0){
        this.data=[];

        for(let i=0;i<this.rows;i++){
            let tarr=[];
            for(let j=0;j<this.cols;j++){
                tarr.push(value);
            }
            this.data.push(tarr);
        }
    }

    init(rows,cols,value=0){
        this.data=[];
        this.rows=rows;
        this.cols=cols;

        for(let i=0;i<rows;i++){
            let tarr=[];
            for(let j=0;j<cols;j++){
                tarr.push(value);
            }
            this.data.push(tarr);
        }
    }

    loadData(data){
        let errMsg="Matrix Data must be a 2D array.";
        if(Array.isArray(data)){
            data.forEach(d => {
                if(!Array.isArray(d)){
                    console.error(errMsg);
                    this.truncate();
                }
            });
            this.data=data;
            let type=this.isValidMatrix();
            if(!type){
                console.error("MATRIX_ERROR: Invalid matrix data given");
                this.truncate();
            }
                
        }else{
            console.error(errMsg);
        }
       
    }
    
    /////////////////matrix methods - Instance method///////////
    isValidMatrix(){
        let valid=true;
        if(this.data.length==0){
            this.rows=0;
            this.cols=0;
            return true;
        }
        
        let ms=this.data[0].length;
        let r=0;
        for(let i=0;i<this.data.length;i++){
            if(this.data[i].length!=ms){
                valid=false;
                break;
            }
            r++;
        }

        this.rows=r;
        this.cols=ms;
        return valid;
    }

    isNullMatrix(){
        if(this.data.length==0){
            return true;
        }
        else{
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].length!=0){
                    return false;
                }
            }
        
            return true;
        }
    }

    isZeroMatrix(){
        if(this.isNullMatrix()){
            return false;
        }
        for(let i=0;i<this.data.length;i++){
            for(let j=0;j<this.data[i].length;j++){
                if(this.data[i][j]!=0){
                    return false;
                }
            }
        }

        return true;
    }

    isRowMatrix(){
        if(this.isNullMatrix()){
            return false;
        }
        if(this.data.length==1){
            return true;
        }else{
            return false;
        }
    }

    isColumnMatrix(){
        if(this.isNullMatrix()){
            return false;
        }
        if(this.data.length>0){
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].length!=1)
                    return false;
            }

            return true;
        }else{
            return false;
        }
    }

    isSquareMatrix(){
      if(this.isNullMatrix()){
          return false;
      }  
      let k=this.data.length;
      for(let i=0;i<this.data.length;i++){
          if(this.data[i].length!=k){
              return false;
          }
      }
      return true;
    }

    isDiagonalMatrix(){
        if(this.isNullMatrix()){
            console.error("Matrix is a Null Matrix!");
            return false;
        }
        if(this.isSquareMatrix()){
            for(let i=0;i<this.data.length;i++){
                for(let j=0;j<this.data[i].length;j++){
                    if((i==j && this.data[i][j]!=0)||(i!=j && this.data[i][j]==0)){

                    }else{
                        return false;
                    }
                }
            }

            return true;
        }else{
            console.error("Matrix is not a square matrix!");
            return false;
        }
    }

    isIdentityMatrix(){
        if(this.isNullMatrix()){
            console.error("Matrix is a Null Matrix!");
            return false;
        }
        if(this.isSquareMatrix()){
            for(let i=0;i<this.data.length;i++){
                for(let j=0;j<this.data[i].length;j++){
                    if((i==j && this.data[i][j]==1)||(i!=j && this.data[i][j]==0)){

                    }else{
                        return false;
                    }
                }
            }

            return true;
        }else{
            console.error("Matrix is not a square matrix!");
            return false;
        }
    }

    isTriangularMatrix(){
        if(this.isUpperTriangularMatrix() || this.isLowerTriangularMatrix()){
            return true;
        }else{
            return false;
        }
    }

    isUpperTriangularMatrix(){
        if(this.isNullMatrix()){
            console.error("Matrix is a Null Matrix!");
            return false;
        }
        if(this.isSquareMatrix()){
            for(let i=0;i<this.data.length;i++){
                for(let j=0;j<this.data[i].length;j++){
                    if((i<=j && this.data[i][j]!=0)||(i>j && this.data[i][j]==0)){

                    }else{
                        return false;
                    }
                }
            }

            return true;
        }else{
            console.error("Matrix is not a square matrix!");
            return false;
        }
    }

    isLowerTriangularMatrix(){
        if(this.isNullMatrix()){
            console.error("Matrix is a Null Matrix!");
            return false;
        }
        if(this.isSquareMatrix()){
            for(let i=0;i<this.data.length;i++){
                for(let j=0;j<this.data[i].length;j++){
                    if((i>=j && this.data[i][j]!=0)||(i<j && this.data[i][j]==0)){

                    }else{
                        return false;
                    }
                }
            }

            return true;
        }else{
            console.error("Matrix is not a square matrix!");
            return false;
        }
    }

    getPricipalDiagonal(){
        if(this.isNullMatrix()){
            console.error("Matrix is a Null Matrix!");
            return undefined;
        }

        if(this.isSquareMatrix()){
            let pd=[];
            for(let i=0;i<this.data.length;i++){
                for(let j=0;j<this.data[i].length;j++){
                    if(i==j){
                        pd.push(this.data[i][j])
                    }
                }
            }

            return pd;
        }else{
            console.error("Matrix is not a square matrix!");
            return undefined;
        }
    }

    transpose(effect="return"){
        if(this.isNullMatrix()){
            if(effect=="self")
                this.data=[];
                
            return new Matrix([]);
        }
        
        let rows=this.cols;
        let cols=this.rows;
        let nm=[];

        for(let i=0;i<rows;i++){
            let tmp=[];
            for(let j=0;j<cols;j++){
                tmp.push(this.data[j][i]);
            }
            nm.push(tmp);
        }

        if(effect=="self"){
            this.rows=rows;
            this.cols=cols;
            this.data=nm;

        }
        return new Matrix(nm);
    }

    minor(row,col){
        if(this.isNullMatrix()){
            console.error("The matrix is a null matrix!");
            return undefined;
        }
        if(row==undefined || col==undefined){
            console.error("Cann't split the matrix, row and column should be given.")
            return undefined;
        }
        if(row<0 || col<0 || row>=this.rows || col>=this.cols){
            console.error("row and column index is not proper for strip!");
            return undefined;
        }

        //////////////you code
        return Matrix.determinant(this.getSubMatrix(row,col));
        
    }

    cofactor(row,col){
        if(this.isNullMatrix()){
            console.error("The matrix is a null matrix!");
            return undefined;
        }
        if(row==undefined || col==undefined){
            console.error("Cann't split the matrix, row and column should be given.")
            return undefined;
        }
        if(row<0 || col<0 || row>=this.rows || col>=this.cols){
            console.error("row and column index is not proper for strip!");
            return undefined;
        }

        ///////your code
        return this.minor(row,col)*Math.pow(-1,(row+col));
    }

    determinant(){
        return Matrix.determinant(this);


    }

    adjoint(){
        return Matrix.adjoint(this);
    }

    inverse(){
        return Matrix.inverse(this);
    }

    getSubMatrix(row,col){
        if(this.isNullMatrix()){
            console.error("The matrix is a null matrix!");
            return undefined;
        }
        if(row==undefined || col==undefined){
            console.error("Cann't split the matrix, row and column should be given.")
            return undefined;
        }
        if(row<0 || col<0 || row>=this.rows || col>=this.cols){
            console.error("row and column index is not proper for strip!");
            return undefined;
        }

        let nm=[];
        for(let i=0;i<this.data.length;i++){
            if(row!=i){
                let tmp=[];
                for(let j=0;j<this.data[i].length;j++){
                    if(col!=j){
                        tmp.push(this.data[i][j]);
                        // console.log(i+","+j+"-"+this.data[i][j]+"-"+row+","+col)
                    }    
                }
                nm.push(tmp);
            }
            

        }

        return new Matrix(nm);

    }

    ////////matrix methods - Class Functions/////////////
    static add=function(a,b){
        ////check the possibility//////
        if(a.rows==b.rows && a.cols==b.cols){
            let tmp=new Matrix();
            tmp.init(a.rows,a.cols);

            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                   tmp.data[i][j]=a.data[i][j]+b.data[i][j];
                }
            }

            return tmp;
   
        }else{
            console.error("Matrix addition is not possible! Dimensions of two matrices must be same for addition.");
            return undefined;
        }
    }

    static subtract=function(a,b){
         ////check the possibility//////
         if(a.rows==b.rows && a.cols==b.cols){
            let tmp=new Matrix();
            tmp.init(a.rows,a.cols);

            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                   tmp.data[i][j]=a.data[i][j]-b.data[i][j];
                }
            }

            return tmp;
   
        }else{
            console.error("Matrix subtraction is not possible! Dimensions of two matrices must be same for subtraction.");
            return undefined;
        }
    }

    static multiplyEveryElement=function(a,b){
         ////check the possibility//////
         if(a.rows==b.rows && a.cols==b.cols){
            let tmp=new Matrix();
            tmp.init(a.rows,a.cols);

            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                   tmp.data[i][j]=a.data[i][j]*b.data[i][j];
                }
            }

            return tmp;
   
        }else{
            console.error("Matrix multiplication on every element is not possible! Dimensions of two matrices must be same for this operation.");
            return undefined;
        }
    }

    static multiply=function(a,b){
        if(a.cols==b.rows){
            let tmp=new Matrix();
            tmp.init(a.rows,b.cols);

            for(let i=0;i<a.rows;i++){
               
                for(let j=0;j<b.cols;j++){
                    let s=0;
                    for(let k=0;k<a.cols;k++){
                        s+=a.data[i][k]*b.data[k][j];

                    }
                    tmp.data[i][j]=s;
                }
            }

            return tmp;
        }else{
            console.error("Matrix multiplication is not possible! Number of column of first matrix and number of rows of second matrix should be same.");
            return undefined;
        }
    }

    static divideEveryElement=function(a,b){
         ////check the possibility//////
         if(a.rows==b.rows && a.cols==b.cols){
            let tmp=new Matrix();
            tmp.init(a.rows,a.cols);

            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                   tmp.data[i][j]=a.data[i][j]/b.data[i][j];
                }
            }

            return tmp;
   
        }else{
            console.error("Matrix division is not possible! Dimensions of two matrices must be same for division.");
            return undefined;
        }
    }

    static transpose=function(mat){
        if(mat.isNullMatrix()){
            return new Matrix([]);
        }
        let rows=mat.cols;
        let cols=mat.rows;
        let nm=[];

        for(let i=0;i<rows;i++){
            let tmp=[];
            for(let j=0;j<cols;j++){
                tmp.push(mat.data[j][i]);
            }
            nm.push(tmp);
        }

        return new Matrix(nm);
    }

    static determinant=function(mat){
        if(mat.isNullMatrix()){
            console.error("Matrinx is a Null Matrix!");
            return undefined;
        }
        if(!mat.isSquareMatrix()){
            console.error("Matrix is not square!");
            return undefined;
        }
        if(mat.rows==1 && mat.cols==1){
            return mat.data[0][0];
        }
        /////your code here////
        let mp=1;
        let s=0;
        for(let i=0;i<mat.data[0].length;i++){
            s=s+mat.data[0][i]*Matrix.determinant(mat.getSubMatrix(0,i))*mp;
            mp*=-1;
        }

        return s;

    }

    static multiplyScalar=function(mat,n) {
        let nm=[];
        for(let i=0;i<mat.data.length;i++){
            let t=[];
            for(let j=0;j<mat.data[i].length;j++){
                t.push(mat.data[i][j]*n);
            }
            nm.push(t);
        }

        return new Matrix(nm);
    }

    static divideScaler(mat,n){
        let nm=[];
        for(let i=0;i<mat.data.length;i++){
            let t=[];
            for(let j=0;j<mat.data[i].length;j++){
                t.push(mat.data[i][j]/n);
            }
            nm.push(t);
        }

        return new Matrix(nm);
    }

    static copy(a,b){
        if(b!=undefined){
            b.data=Matrix.multiplyScalar(a,1).data;
            b.rows=a.rows;
            b.cols=a.cols;
            b.isValidMatrix();
        }
        else
            return Matrix.multiplyScalar(a,1);
    }

    static adjoint(mat){
        if(mat.isNullMatrix()){
            console.error("Matrinx is a Null Matrix!");
            return undefined;
        }
        if(!mat.isSquareMatrix()){
            console.error("Matrix is not square!");
            return undefined;
        }

        let nm=[];
        for(let i=0;i<mat.data.length;i++){
            let t=[];
            for(let j=0;j<mat.data[i].length;j++){
                t.push(mat.cofactor(i,j));
            }
            nm.push(t);
        }

        let g=new Matrix(nm);
        return Matrix.transpose(g);
    }

    static inverse(mat){
        if(mat.isNullMatrix()){
            console.error("Matrinx is a Null Matrix!");
            return undefined;
        }
        if(!mat.isSquareMatrix()){
            console.error("Matrix is not square!");
            return undefined;
        }

        let det=Matrix.determinant(mat);
        if(det==0){
            console.error("Inverse operation failed! Determinant is zero!");
            return undefined;
        }

        let adj=Matrix.adjoint(mat);
        return Matrix.divideScaler(adj,det);
    }

    ///////////////////////VISUAL TO DOM////////////////////////

    ///////////adding style sheet//////////
    addStyleSheet(){
        let links = document.getElementsByTagName("link");
        for(let i=0;i<links.length;i++){
            if(links[i].getAttribute("HB_MATRIX_STYLE")){
                return;
            }
        }
        let link=document.createElement("link");
        link.setAttribute("rel","stylesheet");
        link.setAttribute("href","matrix_01_style.css");
        link.setAttribute("HB_MATRIX_STYLE","SHEET01");
        document.getElementsByTagName("head")[0].appendChild(link);
   }

   /////////////PRINTING METHODS//////////////////////
   print(type="normalText",container=document.getElementsByTagName("body")[0]){
       switch(type){
           case "details":
               this.printDetails(container);
               break;
           case "natural":
               this.printNatural(container);
               break;
           case "normalText":
               this.printNormalText(container);
               break;
           default:
               this.printNormalText(container); 
       }
   }

   printNormalText(container=document.getElementsByTagName("body")[0]){
       let cont=document.createElement("div");
       cont.setAttribute("matid",this.matId);
               
       let str="";

       if(this.isNullMatrix()){
           str="[--NULL MATRIX--]";
       }else{
           for(let i=0; i<this.data.length; i++){
               for(let j=0; j<this.data[i].length; j++){
                   str+=this.data[i][j]+"&nbsp;&nbsp;";
               }
   
               str+="<br>";
           }
   
       }

       cont.innerHTML=str;

       container.appendChild(cont);
   }

   printAsTable(container=document.getElementsByTagName("body")[0]){
       
       let table=document.createElement("table");
       table.setAttribute("matid",this.matId);

       table.classList.add("HB_MATRIX_TABLE_PRINT_01");
       table.setAttribute("cellspacing",0);
       container.appendChild(table);
       if(this.isNullMatrix()){
           let txt=document.createTextNode("[--NULL MATRIX--]");
           let tr=document.createElement("tr");
           let td=document.createElement("td");
           table.appendChild(tr);
           tr.appendChild(td);
           td.appendChild(txt);
           return;
       }

       for(let i=0;i<this.data.length;i++){
           let tr=document.createElement("tr");
           table.appendChild(tr);

           for(let j=0;j<this.data[i].length;j++){
               let td=document.createElement("td");
               tr.append(td);

               let txt=document.createTextNode(this.data[i][j]);
               td.appendChild(txt);


           }
       }
   }

   printNatural(container=document.getElementsByTagName("body")[0]){
       let table=document.createElement("table");
       table.setAttribute("matid",this.matId);

       table.classList.add("HB_MATRIX_01_NATURAL_VIEW");
       table.setAttribute("cellspacing",0);
       container.appendChild(table);
       if(this.isNullMatrix()){
           let txt=document.createTextNode("[--NULL MATRIX--]");
           let tr=document.createElement("tr");
           let td=document.createElement("td");
           table.appendChild(tr);
           tr.appendChild(td);
           td.appendChild(txt);
           return;
       }

       for(let i=0;i<this.data.length;i++){
           let tr=document.createElement("tr");
           table.appendChild(tr);

           for(let j=0;j<this.data[i].length;j++){
               let td=document.createElement("td");
               tr.append(td);

               let txt=document.createTextNode(this.data[i][j]);
               td.appendChild(txt);


           }
       }
   }

   ////////////print all properties of matrix created by HB//////
   printDetails(container=document.getElementsByTagName("body")[0]){
       let cont=document.createElement("div");
       cont.setAttribute("matid",this.matId);
       
       let table=document.createElement("table");
       let caption=document.createElement("caption");
       let thead=document.createElement("thead");
       let tbody=document.createElement("tbody");

       table.classList.add("HB_MATRIX_DETAILS_01");

       ///////append////////////
       table.appendChild(caption);
       table.appendChild(thead);
       table.appendChild(tbody); 
       
       /////////caption/////////
       let cpt=document.createTextNode("Matrix Properties");
       caption.appendChild(cpt);

        ////////header////////
       let c1=document.createElement("th");
       thead.appendChild(c1);
       let c2=document.createElement("th");
       thead.appendChild(c2);

       let t1=document.createTextNode("Property");
       let t2=document.createTextNode("Value");

       c1.appendChild(t1);
       c2.appendChild(t2);

       ///////body//////////
       let rr;

       ///-------------copy---------------
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("matId");
       t2=document.createTextNode(this.matId);

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("rows");
       t2=document.createTextNode(this.rows);

       c1.appendChild(t1);
       c2.appendChild(t2);

       ///----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("cols");
       t2=document.createTextNode(this.cols);

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isFixedLength");
       t2=document.createTextNode(this.isFixedLength);

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isEditable");
       t2=document.createTextNode(this.isEditable);

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isNullMatrix");
       t2=document.createTextNode(this.isNullMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isZeroMatrix");
       t2=document.createTextNode(this.isZeroMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isColumnMatrix");
       t2=document.createTextNode(this.isColumnMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isRowMatrix");
       t2=document.createTextNode(this.isRowMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isSquareMatrix");
       t2=document.createTextNode(this.isSquareMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isIdentityMatrix");
       t2=document.createTextNode(this.isIdentityMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isDiagonalMatrix");
       t2=document.createTextNode(this.isDiagonalMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isUpperTriangularMatrix");
       t2=document.createTextNode(this.isUpperTriangularMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isLowerTriangularMatrix");
       t2=document.createTextNode(this.isLowerTriangularMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       rr=document.createElement("tr");
       tbody.appendChild(rr);

       c1=document.createElement("td");
       c2=document.createElement("td");

       rr.appendChild(c1)
       rr.appendChild(c2)

       t1=document.createTextNode("isTriangularMatrix");
       t2=document.createTextNode(this.isTriangularMatrix());

       c1.appendChild(t1);
       c2.appendChild(t2);
       ///-----------------------------------
       //===================================
       container.appendChild(cont);
       cont.appendChild(table)
   
       
   }


}

Matrix.mat_id=0;


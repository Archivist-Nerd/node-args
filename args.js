/*
        Copyright (c) 2020 Archivist-Nerd
*/
'use strict';

const regex = {
                flags :  /^(-)([^-\s\d\.][^\s\d=]*)=?/i,
                option:  /^(--)([^-\s\d\.][^\s=]*)=?/i,
                string:   /^"([^"\\]*(\\.[^"\\]*)*)"/i,
                number:   /^([\+-]?(\d*\.?)\d+)$/i,
                values:   /^(\S+)/i,
              }
    , $0 = (process.argv[1].indexOf( process.cwd() )=== 0)? process.argv[1].substr(process.cwd().length+1):process.argv[1]
    ;

module.exports = ( ( argv=process.argv.slice(2) )=>{
  /*

          process function

  */
  function process( _argv=[], args=(Array.isArray(_argv))? _argv.join(' '):_argv ){
    const setValue = ( tag, value=true )=>values[tag]=(values[tag]==undefined)? value
                                                                             : (!Array.isArray(values[tag]))? [ values[tag], value]
                                                                                                            : [ ...values[tag], value ]
        , getValue = ( match=args.match( regex.string ) )=>{
                            if (isTag()) return true
                            if (match==null) match=args.match( regex.values )
                            args = args.substr(match[0].length).trim()
                            return regex.number.test( match[1] )? parseFloat(match[1]):match[1]
                          }
        , isTag    = ()=>(args.match( regex.option ) || args.match( regex.flags ))
        ;
    let values  = {
                    _: []
                  }
      , match
      ;
    while (args.length){
      args = args.trim()
      if ( match=isTag() ){     // flag or option
        args = args.substr(match[0].length).trim()
        if (match[1].length==1){          // flags
          let flags = match[2].split('')
            , last  = flags.pop()
          flags.forEach( flag=>{
            values[flag]=(values[flag])? [...values[flag], true]:[true]
          })
          setValue( last, getValue() )
        } else                            // option
          if (args.length)
            setValue( match[2], getValue() );
          else
            setValue( match[2], true );
      } else                              // value
        values._.push( getValue() );
    }
    values.$0 = $0
    return values
  }
  /*
      Object to Return
  */
  return {
    argv: process( argv ),
    process,
  }
})();
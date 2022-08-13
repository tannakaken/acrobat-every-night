use strict;
use warnings;
use Encode;
$\ = "\n";
my @files = glob "./novels/*";
foreach my $file (@files) {
    
    open(DATAFILE, "<", $file) or die("error :$!");
    $file=~s/txt/js/;
    $file=~s/novels\//src\/txt/;
    my $data = "";
    while (my $line = <DATAFILE>){
        chomp($line);
        $data .= $line;
    }
    close(DATAFILE);

    
    open(DATAFILE, ">", $file) or die("error :$!");
    print DATAFILE "const data = [";
    my $enc = find_encoding 'utf8';
    $data = $enc->decode($data);
    my $str = substr($data, 0, 333);
    $str = $enc->encode($str);
    print DATAFILE "  \"$str\",";
    for (my $i = 0; length($data) > 333 + 111 * $i; $i++) {
        my $str = substr($data, 333 + $i * 111, 111);
        $str = $enc->encode($str);
        print DATAFILE "  \"$str\",";
    }
    print DATAFILE "];";
    print DATAFILE "export default data;";
}
